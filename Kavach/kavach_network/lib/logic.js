/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Transaction to use the data transaction
 * @param {kavachnetwork.PutDtBlock} dataReq
 * @transaction
 */
/*async function sampleTransaction(dataReq) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('kavachnetwork.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('kavachnetwork', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
*/
function putDtBlock(dataReq) {
    
    let assetRegistryD = getAssetRegistry('kavachnetwork.TData');
    var currentParticipant = getCurrentParticipant();
    var tempAsset;
    foreach(asset in assetRegistryD)
    {

        if(asset.dataUser==currentParticipant.bankID)
        {
            tempAsset=asset;
        }
    }


    let assetRegistryA = getAssetRegistry('kavachnetwork.TAccess');
    

    if(assetRegistryA.exists(dataReq.acBlockID))
    {

        var keyArray=[];
        //const assetRegistry = await getAssetRegistry('kavachnetwork.TAccess');
        const localAsset = await assetRegistryA.get(dataReq.acBlockID);
        foreach(f in tempAsset.reqFields)
        {
            foreach(field in localAsset.fieldTable)
            {
                foreach(permID in field.permitted_ID)
                {
                    if(f==field && permID==currentParticipant.bankID)
                        keyArray.push(field.key);
                        
                }
            }
        }
        return keyArray;

    }
    else
    {
        console.log("Unregistered User!!!");
    }
    
}